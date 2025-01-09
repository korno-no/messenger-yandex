import { expect} from 'chai';
import Router from './router.ts';
import Block, {BlockProps} from '../core/block.ts';

describe('Router', () => {
    class Test extends Block {
        constructor(props: BlockProps) {
            super({ ...props });
        }
        render() {
            return `<p>Fake</p>`;
        }
    }

    let routerTest: Router; 

    before(() => {
        routerTest = new Router('#app');
        routerTest
            .use('/', Test)           
            .use('/secondPath', Test) 
            .use('/thirdPath', Test) 
            .start();
        
        routerTest.go('/');
    });

    it('should be on initial path', () => {
        expect(window.location.pathname).to.equal('/');
    });

    it('should go on next path', () => {
        routerTest.go('/secondPath');
        expect(window.location.pathname).to.equal('/secondPath');
    });
});
