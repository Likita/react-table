# react-table
Stack: React, TypeScript, Node.js, PostgreSQL, Express.js, Axios, Material UI

# Steps to run this project:
1. Open server folder, run `cd server`
2. Run `yarn install` command
3. Run `yarn db` command
4. Run `yarn start` command
5. Open another Terminal tab, run `cd react-table`
6. Run `yarn install` command
7. Run `yarn start` command

# What I have changed:
- Add Change Randomizer parameters button in Randomize result popup, because it's more convenient to change results
- Showed Randomizer parameters in Results

# What's possible to optimize:
- Add Notifications
- Add different DB tables for Teams, roles, statuses. And connect them by id
- Randomize filter by other fields (Role, Status, or create a list by checking each developer)
- Add Pagination by Backend
- Add Breadcrumbs
- Add Delete user endpoint
- Add error pages (404)
- Add extra view for View user
- Add extra UI elements from Figma which don't have functionality in the task
- The app could use only 1 Dialog and just change the content inside
- Split userName into Name and Family name and sort by Family name
- Types could be written in an npm module and be shared between the backend and frontend
- Add tests
