import {Page} from "./Page.js";
import {
    btn,
    form,
    fieldset,
    Component,
    numberfield,
    p,
    Form,
    tbar,
    comp,
    radio
} from "@intermesh/goui";

export class Sg extends Page {
    private form: Form;
    private calcCmp: Component;

    constructor() {
        super();

        this.title = "Calculate gravity from temperature";

        this.items.add(
            this.form = form({
                    itemId: "form",
                    title: "Calculate gravity",
                    cls: "scroll fit",
                    handler: (form) => {
                        const values = form.getValues(),
                            ar = values.measuredGravity;

                        let tf = values.measuredTemperature,
                            cf = values.calibratedTemperature;

                        if(values.tempUnit === "C") {
                            tf = this.ctof(tf);
                            cf = this.ctof(cf);
                        }

                        // Black magic buggery numbers
                        const a = 1.00130346,
                            b = 0.000134722124,
                            c = 0.00000204052596,
                            d = 0.00000000232820948;

                        let o = ar * (( a - (b * tf) + (c * Math.pow(tf, 2)) - (d * Math.pow(tf, 3))) /
                            ( a - (b * cf) + (c * Math.pow(cf, 2)) - (d * Math.pow(cf, 3))));
                        o =  Math.round((o * 10000) / 10000);

                        this.calcCmp.html = "Calculated value: " + o;
                        this.calcCmp.show();

                    },

                },
                p("Enter the measured temperature in Celsius and the measured gravity. If your hydrometer is " +
                    "calibrated against a non-standard temperature, please enter the calibration temperature as well."),
                fieldset({
                        legend: "Measurements"
                    },
                    numberfield({
                        itemId: "temperature",
                        label: "Measured temperature",
                        name: "measuredTemperature",
                        required: true,
                        hint: "This is the measured temperature in Celsius",
                        min: 0,
                        max: 100,
                        decimals: 1
                    }),
                    numberfield({
                        itemId: "measuredGravity",
                        label: "Gravity",
                        name: "measuredGravity",
                        required: true,
                        hint: "The gravity as measured by your hydrometer",
                        min: 1000,
                        max: 1150,
                        decimals: 0
                    })
                ),
                fieldset({
                        legend: "Calibration"
                    },
                    numberfield({
                        itemId: "calibratedTemperature",
                        label: "Calibrated temperature",
                        name: "calibratedTemperature",
                        required: true,
                        min: 0,
                        max: 100,
                        value: 20,
                        hint: "Default calibration temperature of your hydrometer in Celsius",
                        decimals: 0
                    })
                ),
                fieldset({
                    legend: "Units"
                },
                    radio({
                        label: "Temperature",
                        type: "button",
                        name: "tempUnit",
                        value: "C",
                        options: [
                            {text: "Celsius", value: "C"},
                            {text: "Fahrenheit", value: "F"}
                        ]}
                    ),
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

    private ctof(t: number): number {
        return (t * (9/5) + 32);
    }
}