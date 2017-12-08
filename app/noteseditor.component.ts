import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'my-app',
    template: `<div class="container">
<div class="row">
<div class = "col-md-8" >
<notes  [section] = "section" >
</notes >
</div >
<div class = "col-md-4" >
<sections (sectionChanged) = "setSection($event)" >
</sections>
</div>
</div>
</div>`
})

export class NotesEditorComponent {
    section: string;


    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.params
            .map(params => params["name"])
            .subscribe(section => this.section = section);
    }

    setSection(section: string) {
        this.section = section;
        this.router.navigate([section]);
    }

}