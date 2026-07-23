# Coding Assessment Module

This adds a full **Placement Cell → Student coding test** flow on top of the
existing PRI project, alongside the existing aptitude module. It reuses the
existing auth (JWT), `User`/`Role` model, and UI conventions.

## What it does

- **Placement Cell** authors a coding test: one or more questions, each with
  a description, difficulty, points, and a set of stdin/stdout test cases
  (visible "sample" cases + hidden cases used only for scoring). Publishing
  assigns the test to every student.
- **Students** get an in-browser IDE (Monaco editor) supporting **Python,
  Java, C, C++, and JavaScript**. They can **Run** code against the sample
  test cases, and **Submit** a question to score it against every test case
  (sample + hidden). Code execution happens via the free, public
  [Piston API](https://github.com/engineer-man/piston) — no API key needed.
- The test runs **full-screen and timed**. If the student **loses window
  focus, switches tabs, or exits full screen**, the test is **immediately
  auto-submitted** and a **screenshot** of the exam tab (captured client-side
  with `html2canvas`) is sent to the Placement Cell.
- **Only the Placement Cell** can review that screenshot and decide whether
  to **approve** (the student may resume, with the remaining time restored)
  or **reject** (the auto-submit stands, final) the session. Students can
  never resume their own session.
- Scores are computed automatically from test-case results, but stay hidden
  from students until the Placement Cell explicitly **publishes marks** for
  that test.

## Backend layout (`backend/demo/src/main/java/com/example/demo`)

```
entity/coding/        CodingTest, CodingQuestion, TestCase, CodingTestAssignment,
                       CodeSubmission, CodingAssignmentStatus, ResumeDecision
dto/coding/            request/response DTOs
repository/            CodingTestRepository, CodingQuestionRepository, TestCaseRepository,
                       CodingTestAssignmentRepository, CodeSubmissionRepository
Service/               CodeExecutionService (talks to Piston), CodingTestService (business logic)
controller/            StudentCodingTestController, PlacementCodingTestController
```

`GlobalExceptionHandler`'s `basePackages` was also corrected from a stray
`com.blue.aptitude` to `com.example.demo` so it actually applies to this
project's exceptions (including the new ones).

### API

**Student** (`/api/student/coding-tests`, role `STUDENT`):
- `GET /` — list assigned tests
- `POST /{testId}/start` — start (or, once approved, resume) the timed session
- `PUT /{testId}/questions/{questionId}/code` — silent autosave (debounced from the editor)
- `POST /{testId}/questions/{questionId}/run` — run against sample cases only, not scored
- `POST /{testId}/questions/{questionId}/submit` — run against all cases, scored
- `POST /{testId}/violation` — reports a proctoring violation + screenshot; auto-submits
- `POST /{testId}/submit` — final submit
- `GET /{testId}/result` — fetch result (score hidden until published)

**Placement Cell** (`/api/placement/coding-tests`) — every endpoint here
independently re-checks `Role.PLACEMENT_CELL` against the authenticated
user in the controller itself (not just the route), since "only the
Placement Cell can decide" is a hard requirement, not just a UI nicety:
- `POST /publish` — create + assign a test
- `GET /violations?testId=` — pending resume requests (with screenshots)
- `POST /assignments/{assignmentId}/resume-decision` — `{ "approve": true|false }`
- `GET /{testId}/results` — all results for a test
- `POST /{testId}/publish-results` / `POST /{testId}/unpublish-results`

### Configuration (`application.properties`)

```
coding.execution.base-url=https://emkc.org/api/v2/piston
coding.execution.timeout-ms=15000
coding.test.default-duration-minutes=60
```

Piston is free and requires no key. If you'd rather run your own sandboxed
executor (e.g. self-hosted Piston, or Judge0), just point
`coding.execution.base-url` at it and adjust `CodeExecutionService`'s
language/version map if needed.

## Frontend layout (`frontend/src`)

```
api/codingApi.js                          axios calls for both roles
hooks/useScreenshot.js                     html2canvas capture on violation
hooks/useExamSecurity.js                   reused as-is from the aptitude module
hooks/useCountdown.js                      reused as-is from the aptitude module
styles/coding.css                          IDE-specific dark theme, reuses apt-* tokens
pages/placement_cell/PublishCodingTest.jsx builder UI: questions + test cases
pages/placement_cell/CodingTestManage.jsx  violation review (approve/deny + screenshot) & publish marks
pages/student/CodingTestList.jsx           list of assigned tests
pages/student/CodingTestRunner.jsx         the IDE: Monaco editor, run/submit, proctoring lockdown
pages/student/CodingTestResult.jsx         score view (once published)
```

New dependencies added to `package.json`: `@monaco-editor/react`, `html2canvas`.
Run `npm install` in `frontend/` before starting the dev server.

Routes added in `App.jsx`:
- `/placement/coding-tests/publish`, `/placement/coding-tests/manage`
- `/student/coding-tests`, `/student/coding-tests/:testId/take`, `/student/coding-tests/:testId/result`

Both dashboards got new buttons wired to these routes.

## Running your own code execution backend (Piston)

**As of Feb 15, 2026, the public `emkc.org` Piston API requires an API key**
(discretionary, granted manually via Discord — see
[engineer-man/piston](https://github.com/engineer-man/piston)). Without one
you'll get `401 Unauthorized`. For development/coursework, self-hosting is
the practical path — Piston is open source and just a Docker container.

**On Windows**, install Docker Desktop (with the WSL2 backend) first, then:

```bash
docker run --privileged -v ${PWD}:/piston --tmpfs /piston/jobs -dit -p 2000:2000 --name piston_api ghcr.io/engineer-man/piston
```

This starts the API with **no language runtimes installed yet**. Install
the ones this project uses via the CLI:

```bash
git clone https://github.com/engineer-man/piston
cd piston/cli && npm install
node index.js -u http://localhost:2000 ppman install python
node index.js -u http://localhost:2000 ppman install java
node index.js -u http://localhost:2000 ppman install node
node index.js -u http://localhost:2000 ppman install gcc      # for C
node index.js -u http://localhost:2000 ppman install g++      # for C++
```

Then point the backend at your local instance in `application.properties`:

```
coding.execution.base-url=http://localhost:2000/api/v2
```

`CodeExecutionService` fetches `GET {base-url}/runtimes` and automatically
uses whatever version got installed for each language — you don't need to
hardcode version numbers to match your install. If that fetch fails (e.g.
the container isn't reachable yet), it falls back to a hardcoded default
version, which will likely 400 if it isn't actually installed, so watch the
backend console log on first run to confirm each language resolved.

Verify it's up and reachable from Java (not just from PowerShell/`curl` —
Windows' proxy/cert settings don't automatically apply to the JVM) by
watching the backend log when you click "Run": errors there now include the
real underlying cause (timeout, connection refused, TLS failure, HTTP
status, etc.) instead of a generic message.

## Notes / things worth knowing

- Questions are language-agnostic: the student's program reads from **stdin**
  and must print to **stdout**; the same test case works for every language.
  Mention this in each question's description.
- A screenshot is a **DOM capture of the exam tab** (`html2canvas`), not a
  true OS-level screen capture — browsers won't allow silent, repeated
  access to `getDisplayMedia` without an intrusive permission prompt each
  time, so this is the practical non-disruptive equivalent.
- If a student's code is still mid-edit (never explicitly submitted) when a
  violation or the timer fires, it's automatically run and scored anyway at
  finalize time, so nothing typed is lost.
- The resume flow restores the time that was left on the clock when the
  violation fired (minimum 60s), not a fresh full timer.
