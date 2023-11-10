import React, { Component, ChangeEvent } from 'react';

import './Board.css';

interface BoardProps {
    initialColor: string;
    initialSize: string;
}

interface BoardState {
    color: string;
    size: string;
}

class Board extends Component<BoardProps, BoardState> {
    timeout: any;
    ctx: CanvasRenderingContext2D | null = null;
    isDrawing = false;

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            color: props.initialColor,
            size: props.initialSize,
        };

        // Bind the methods in the constructor to access 'this'
        this.changeColor = this.changeColor.bind(this);
        this.changeSize = this.changeSize.bind(this);
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    componentDidUpdate(prevProps: BoardProps, prevState: BoardState) {
        if (
            prevProps.initialColor !== this.props.initialColor ||
            prevProps.initialSize !== this.props.initialSize
        ) {
            this.setState({
                color: this.props.initialColor,
                size: this.props.initialSize,
            });
            this.ctx!.strokeStyle = this.props.initialColor;
            this.ctx!.lineWidth = parseFloat(this.props.initialSize);
        } else if (prevState.color !== this.state.color || prevState.size !== this.state.size) {
            this.ctx!.strokeStyle = this.state.color;
            this.ctx!.lineWidth = parseFloat(this.state.size);
        }
    }

    changeColor(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            color: event.target.value,
        });
    }

    changeSize(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            size: event.target.value,
        });
    }

    drawOnCanvas() {
        const canvas = document.querySelector('#board') as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d');
        const ctx = this.ctx!;

        const sketch = document.querySelector('#sketch') as HTMLElement;
        const sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        const mouse = { x: 0, y: 0 };
        const last_mouse = { x: 0, y: 0 };

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', (e) => {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - (canvas as HTMLCanvasElement).offsetLeft;
            mouse.y = e.pageY - (canvas as HTMLCanvasElement).offsetTop;
        }, false);

        /* Drawing on Paint App */
        ctx.lineWidth = parseFloat(this.state.size);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.state.color;

        canvas.addEventListener('mousedown', () => {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        const root = this;
        const onPaint = () => {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if (root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(() => {
                const base64ImageData = canvas.toDataURL('image/png');
                // Assuming you have a 'socket' property passed as a prop
                // if (root.props.socket) {
                //     root.props.socket.emit('canvas-data', base64ImageData);
                // }
            }, 1000);
        };
    }

    render() {
        return (
            <div className="container">
                <div className="color-picker-container">
                    Select Brush Color : &nbsp;
                    <input
                        type="color"
                        value={this.state.color}
                        onChange={this.changeColor}
                    />
                </div>
    
                <div className="brushsize-container">
                    Select Brush Size : &nbsp;
                    <select value={this.state.size} onChange={this.changeSize}>
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                    </select>
                </div>
    
                <div className="sketch" id="sketch">
                    <canvas className="board" id="board"></canvas>
                </div>
            </div>
        );
    }
}

export default Board;


