import {Component, comp, h1, Button} from "@intermesh/goui";

export class Page extends Component {


    private titleEl: Component
    constructor() {
        super("section");

        this.items.add(
            comp({cls: "hbox"},
                this.titleEl = h1(),

                comp({flex: 1}),
            )
        );
    }

    protected internalRender(): HTMLElement {
        return super.internalRender();
    }

    set title(title: string) {
        this.titleEl.text = title;
    }

    get title() {
        return this.titleEl.text;
    }
}