import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDirective, PercentageDirective } from './directive/number.directive';
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        NumberDirective,
        PercentageDirective

    ],
    exports: [
        NumberDirective,
        PercentageDirective
    ],
})

export class SharedModule { }
