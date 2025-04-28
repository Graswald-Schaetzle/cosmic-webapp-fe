import { Clerk } from '@clerk/clerk-js';
import {initMatterportFrame} from "./scripts/matterport";
import {htmlMarkup} from "./scripts/html-markup";
import {initMenu} from "./scripts/menu";
import {authorizeUser} from "./scripts/api";

const clerkFrontendApi = 'pk_test_aW5maW5pdGUtc3dpZnQtODQuY2xlcmsuYWNjb3VudHMuZGV2JA';
const clerk = new Clerk(clerkFrontendApi);


await clerk.load();
console.log('Clerk loaded', clerk);


if (clerk.user) {

    clerk.mountUserButton(htmlMarkup.clerk.userButton)
    htmlMarkup.clerk.signInModal.classList.add('hidden');
    initMatterportFrame();
    // initMenu();
    authorizeUser(clerk.user)
} else {

    clerk.mountSignIn(htmlMarkup.clerk.signInModal, {
        signInOptions: {
            socialConnections: ['google', 'apple'],
        },
        // afterSignInUrl: '/',
        // afterSignUpUrl: '/',
    });
    htmlMarkup.clerk.userButton.classList.add('hidden');
}
