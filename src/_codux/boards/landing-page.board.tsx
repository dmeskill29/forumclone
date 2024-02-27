import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Landing Page',
    Board: () => <div>
        <header />
    </div>,
    isSnippet: true,
});
