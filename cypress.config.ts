/*
 * Project: TODO APP - e2e automation
 * Author: konrad.wyszynski
 * Copyright © 2024, konrad.wyszynski
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://todo-app-for-cyclope.netlify.app/',
  },
});
