# Technical Test: Game Event Ingesting

## Overview

Develop a self-contained system to ingest events from a hypothetical game.
This test evaluates your ability to design, implement, and explain a multi-component system as a senior engineer end to end.

- The goal is not production-grade code but a clear demonstration of quality, functionality, and thought process.
- **Timebox:** The test is designed to be completed in 4 hours or less.
- **Commit Often:** Show your working process through regular commits.
- **External dependencies:** Use any external dependencies you see fit, you do not need to implement everything from scratch.
- **Keep It Minimal:** Use lightweight libraries and avoid adding unnecessary features, or over-engineering the solution.

## Requirements

- API:
  - Create a REST-compliant API to ingest events.
  - Ensure the API is type-safe and validates input at runtime.
- Queue:
  - Queue the ingested data for processing using a worker system.
- Worker:
  - Implement a worker to process the queued data.
- Database:
  - Store the processed data in a database.
  - Develop a schema to store the data.
- Unit Test:
  - Write one unit test for a critical part of the system.
- Self Contained & Docker Compose:
  - Ensure everything required to run the system is in the repository.
  - Provide a `docker-compose.yml` file to run external dependencies (e.g database)
  - Document the commands to run the system.

## Questions

- What did you use for the API and why?

  - I find out what I could about the tech stack Playa3ull uses from the job description and website primarily
    used these libraries/servers. This was the case for Express, Kysely and Postgres. In addition, it's a solid stack
    with wide adoption and support. I chose Zod for schema validation because the schemas I wrote could also be used by
    the tRPC framework, keeping it dry. A few minor of quality of life libraries were used to keep the code clean
    including dotenv, http-status-codes and body-parser. I introduced and linter and code formatter early to improve
    code quality and consistency.

- What queue/worker system did you choose and why?

  - Redis because it's arguably the easiest pubsub server to integrate for a quick tech demo. It does scale well in
    production however you need to evaluate it with your system requirements. In particular, Redis uses an in-memory model
    which is fast but not as fault-tolerant as messages are lost on restart.

- What database did you use and why?

  - Postgres because it was listed in the job description. This is my go to RDMS its extensible and performant and I
    have used it for years.

- What key decisions did you make about how the system is structured and why?

  - I incorporated some functional programming paradigms where applicable as pure functions are reusable, easy to
    maintain and less prone to error. You can see this in the test cases. If I used the module resolution, I'd have
    to introduce a monkey patching library to test certain components and I was able to easily mock the pubsub service
    without bringing in additional dependencies. All dependencies are coupled to an interface and injected. A dependency
    injection framework could be introduced once things started to scale up.

  - I applied Domain Driven Development techniques. It's a great way to organise code to separate application, business
    logic and infrastructure. For example, this demo does not couple directly with Redis. I could swap it out for another
    pubsub system with minimal code.

> [!IMPORTANT]
> Answer the above questions in this file

## Extra Credit

- Implement a retry mechanism in the worker for failed jobs
- Include a performance optimization (e.g. batch processing in the worker)
- Create additional tests for edge cases

## Commands

To run this project:

- Clone the repository `git clone https://github.com/maeyan-zero/test-software-engineer.git`
- Install dependencies `npm install`
- Optionally, test the code `npm run test`
- If you already have Postgres or Redis running on `5432`, `6379` respectively,
  modify the `.env` file to use another port.
- Start docker `docker compose up`
- Create the Postgres schema `npm run migrate`
- Start the background worker `npm run runner`
- Start the API server `npm run api`

Usage:

`POST /api/event` will accept a JSON payload. Here are some example requests:

"Join Game" event:

```json
{
  "playerId": "sam12345",
  "ipAddress": "127.0.0.1",
  "timestamp": "2024-10-05T14:48:00.000Z",
  "eventType": 0,
  "data": {
    "gameId": "aus-01-005"
  }
}
```

"Leave Game" event:

```json
{
  "playerId": "sam12345",
  "ipAddress": "127.0.0.1",
  "timestamp": "2024-10-05T14:48:00.000Z",
  "eventType": 1
}
```

The server is verbose, watch stdout to see what's happening.
