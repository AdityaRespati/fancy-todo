# fancy-todo

## Actions

1. Login form & oauth
-password strength
-Google & facebook oauth
-(optional) email auth

2. getting started
Create **project**: personal /business

3. personal
-direct ke **work**  personal berisi **todo**

4. business
- opsi create **team**

5. team
- creator **team** otomatis jadi momod
- opsi invite member ke **team** (momod only)
- bisa add momod
- opsi create **project** (all member)
- momod bisa delete **project**
- bisa search project by name, show all, filter by :userid, sort by due date, sort by name, sort by created at asc desc
- ada thread general

6. Project 
- opsi CRUD**work** for mimin
- mimin bisa add mimin 
- opsi invite member **team** ke **project** (mimin only)
- all member can CRUD todo


## Models attributes
1. User
-username
-email
-password 
-team : []
-team_role: 
-project : []
-project_role: 
-works: []

2. team
- team_name
- team_admin = []
- team_member = []
- team_projects = []


3. Project
- project_name
- project_due_date
- project_description
- project_status: [on progress, completed, behind schedule]
- createdAt 
- project_admin = []
- project_member = []
- project_works = []
- project_user


4. work
- work_name
- work_status =  [on progress, completed, behind schedule]
- work_description
- createdAt 
- work_todo = []
- work_user = []

5. todo
- todo_name
- todo_status =  [on progress, completed, behind schedule]
- createdAt 
- todo_due_date 
- todo_description
- todo_category
- todo_user = []


## layout

1. home container
- personal work card
- today todo lists
- your active work 
- activities = list of newest updates on your teams/projects/work

2. navbar
- home
- your teams = redirect to team container
- your projects = redirect to projects container 
- signout

3. teams
- thread board
- list of team (can sort by status)
- 
