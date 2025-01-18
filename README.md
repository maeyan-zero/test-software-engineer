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
- What queue/worker system did you choose and why?
- What database did you use and why?
- What key decisions did you make about how the system is structured and why?

> [!IMPORTANT]
> Answer the above questions in this file

## Extra Credit

- Implement a retry mechanism in the worker for failed jobs
- Include a performance optimization (e.g. batch processing in the worker)
- Create additional tests for edge cases
