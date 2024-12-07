import { expect } from "chai";
import Block, { BlockProps } from "../core/block.ts";

describe('Block', () => {

    class TestBlock extends Block {

        constructor(props: BlockProps) {
            super({...props});
        }
        render(): string {
            return (`
                <main>
                    <div id="greetings">shalom {{addition}}</div>
                </main>`);
        }
    }

    it('should render', () => {
        //arrange
        //act 
        const component = new TestBlock({}); 
        
        //assert
        const result = component?.element?.querySelector('#greetings')?.innerHTML;
        expect(result?.trim()).to.be.eq(`shalom`);
    })
    
    it('should set addition props', () => {
        //arrange
        const props = {addition: "pravoslavnye"}

        //act
        const component = new TestBlock(props)  
        
        //assert
        const result = component?.element?.querySelector('#greetings')?.innerHTML
        expect(result?.trim()).to.be.eq(`shalom ${props.addition}`)
    }) 
});
