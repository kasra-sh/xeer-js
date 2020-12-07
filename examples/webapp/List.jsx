import Exir from "../../vm/exir"
import renderDom from "../../vm/render";
import {deepClone} from "../../core";
import {randomId} from "../../vm_deprecated/util";

export default Exir.createComponent('List', {
    props: {
        step: 100
    },
    state: {
        a: 0,
        items: [],
        children: []
    },
    render() {
        return (<div id={'ListParent' + this.state.a}>
            <button onClick={this.add}>Add 1000</button>
            <button onClick={this.remove}>Remove 1000</button>
            {this.state.a}
            <>
                {
                    this.$children.map((child) => child.$clone())
                }
            </>
            <div>
                {this.state.items.map((idx) => (
                    <div id={'' + this.state.a + idx}>Link {idx}</div>
                ))}
            </div>

        </div>)
    },
    add() {
        // console.log('items', this.state.items.length)
        for (let i = 0; i < this.props.step; i++) {
            this.state.items.push(randomId())
        }
        this.state.a += this.props.step
        this.$isDirty = true
        this.$update()
    },
    remove() {
        // for (let i = 0; i < this.state.a; i++) {
        for (let i = 0; i < this.props.step; i++) {
            this.state.items.pop()
        }
        // console.log(this.state)
        this.state.a -= this.props.step
        this.$update()

        // }
    }
})