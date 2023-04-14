import {Page} from "./Page.js";
import {btn, code, h2, p} from "@intermesh/goui";

export class Home extends Page {
    constructor() {
        super();
        this.title = "Joachims Brew tools in GOUI";

        this.items.add(

            p( "Click on the menu items in the left margin to use the calculation tools"),
            h2("Written in GOUI"),
            p("tja")


        )
    }
}