# LOOK MEMES

## Overview

This project is a comprehensive web application developed using Next.js, designed for managing categories with a user-friendly interface. It offers features like creating, deleting, activating, deactivating, and sorting categories through drag and drop functionality. Additionally, the application enforces confirmation steps for saving changes and deleting categories, enhancing data integrity and user experience.

## Features

- Category Management: Create, delete, activate, and deactivate categories seamlessly.
- Immutable Default Values: Certain default values are locked from changes, ensuring consistency.
- Drag and Drop: Reorder categories with an intuitive drag and drop interface.
- Confirmation Steps: Changes are only saved after additional user confirmation, preventing accidental modifications. Deletions also require a confirmation step, presented via a modal window.
- Search Functionality: Easily search through categories to find what you need quickly.
- CRUD Endpoints: Well-defined API endpoints for Create, Read, Update, and Delete (CRUD) operations, enhancing the application's scalability and maintainability.

## Usage

Adding a Category: Click on the 'Create a Category' button and fill in the name.
Deleting a Category: Click the delete icon next to a category and confirm in the modal window.
Searching: Use the search bar to quickly locate categories.
Sorting: Click and drag the drag icon to reorder them.

## API Documentation

The following endpoints are available for CRUD operations:

Create: POST /api/categories
Read: GET /api/categories
Update: PUT /api/categories/{id}
Delete: DELETE /api/categories/{id}
