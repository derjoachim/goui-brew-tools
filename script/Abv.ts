import {Page} from "./Page.js";
import {
    btn,
    form,
    fieldset,
    Component,
    numberfield,
    p,
    Form,
    tbar, comp
} from "@intermesh/goui";

export class Abv extends Page {
    private form: Form;
    private calcCmp: Component;

    constructor() {
        super();

        this.title = "Calculate ABV form Original and Final Gravity";

        this.items.add(
            this.form = form({
                    itemId: "form",
                    title: "Calculate gravity",
                    cls: "scroll fit",
                    handler: (form) => {
                        // I shamelessly borrowed the alternate formula from the page below:
                        // https://www.brewersfriend.com/2011/06/16/alcohol-by-volume-calculator-updated/
                        const values = form.getValues(),
                            og = values.originalGravity / 1000,
                            fg = values.finalGravity / 1000;
                        let o = (76.08 * ( og - fg )/(1.775 - og)) * (fg / 0.794);

                        this.calcCmp.html = "Calculated ABV: " + o.toFixed(2);
                        this.calcCmp.show();

                    },

                },
                p("Enter the measured temperature in Celsius and the measured gravity. If your hydrometer is " +
                    "calibrated against a non-standard temperature, please enter the calibration temperature as well."),
                fieldset({
                        legend: "Gravity"
                    },
                    numberfield({
                        itemId: "originalGravity",
                        label: "OG",
                        name: "originalGravity",
                        required: true,
                        hint: "The Original Gravity at the moment of pitching yeast",
                        min: 1000,
                        max: 1150,
                        decimals: 0
                    }),
                    numberfield({
                        itemId: "finalGravity",
                        label: "FG",
                        name: "finalGravity",
                        required: true,
                        hint: "The Final Gravity at the moment of bottling",
                        min: 1000,
                        max: 1150,
                        decimals: 0
                    })
                ),
                this.calcCmp = comp({
                    tagName: 'div',
                    cls: 'success',
                    hidden: true,
                    html: "No value calculated"
                }),

                tbar({cls: "bottom"},
                    btn({
                        text: "Reset",
                        type: "reset"
                    }),
                    "->",
                    btn({
                        cls: "primary",
                        text: "Calculate",
                        // icon: "calculation",
                        type: "submit"
                    })
                )
            )
        )
    }
}





