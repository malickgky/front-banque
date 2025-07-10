import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { userInterceptor } from './user.interceptor';
import { UserService } from 'app/core/user/user.service';

export const provideUser = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideHttpClient(withInterceptors([userInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(UserService),
            multi: true,
        },
    ];
};
