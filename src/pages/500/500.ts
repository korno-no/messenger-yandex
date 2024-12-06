import Block, { BlockProps } from '../../core/block.ts';
import { CoverScreen } from '../../components/index.ts';

const backgroundImg = '../../assets/images/background.jpg';

interface IErrorFixingPageProps extends BlockProps {}

export default class ErrorFixingPagePage extends Block <IErrorFixingPageProps> {
  constructor(props: IErrorFixingPageProps) {
    super({
      ...props,
      title: 'ErrorFixingPage Page',
    });
  }

  init() {
    const ErrorScreen = new CoverScreen({
      code: 500,
      background: backgroundImg,
      text: 'We are already fixing it',
    });

    this.children = {
      ...this.children,
      ErrorScreen,
    };
  }

  render(): string {
    return (`
          {{{ErrorScreen}}}
        `);
  }
}
