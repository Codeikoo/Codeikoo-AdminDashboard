import { Routes } from "@angular/router";
import { Jobs } from "./jobs/jobs";
import { JobForm } from "./jobs/job-form/job-form";
import { Users } from "./users/users";

export const ACADEMY_ROUT: Routes = [
  // ... existing routes ...
  { path: 'job', component: Jobs },
  { path: 'job/add', component: JobForm },
  { path: 'job/edit/:id', component: JobForm },
//   { path: 'supply/details/:id', component: SupplyOrderDetailsComponent },

  { path: 'user', component: Users },



];
