import {themesRoutes} from './routes/themeRoutes';
import {userThemeRoutes} from './routes/userThemeRoutes';

const router: Router = Router();

// appRoutes(router);
// staticRoutes(router);
userThemeRoutes(router);
themesRoutes(router);
// healthRoutes(router);
// dadataRoutes(router);

export default router; 