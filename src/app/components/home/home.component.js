import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NotesDataService } from '../../services/notes-data/notes-data.service';
export class HomeComponent {
    constructor(notesDataService, authService) {
        this.notesDataService = notesDataService;
        this.authService = authService;
        this.showNoteModal = false;
    }
    ngOnInit() {
        this.newNote = {};
    }
    onShowNoteModal($event) {
        this.showNoteModal = true;
    }
    onCloseNoteModal($event) {
        this.showNoteModal = false;
    }
    onSignOut() {
        this.authService.logout();
    }
}
HomeComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-home',
                templateUrl: 'home.component.html'
            },] },
];
/** @nocollapse */
HomeComponent.ctorParameters = () => [
    { type: NotesDataService },
    { type: AuthService }
];
