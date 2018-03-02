import { PUBLIC_ROOT, TOKEN_VALIDATION } from '../../login/DefaultRoutes';

// routes to display the search bar by default
export const searchBarRoutes = ['/', '/results'];

// routes that contain their own search bar
export const searchBarRoutesForce = ['/results'];

// routes to always force hide the search bar
export const searchBarRoutesForceHidden = [PUBLIC_ROOT, TOKEN_VALIDATION];
