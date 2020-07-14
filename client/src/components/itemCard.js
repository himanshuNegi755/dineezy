import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './itemCard.css';

const ItemCard = (props) => {
        return (
            <Card style={{ width: '80%' }} className="card-for-item" bg="light">
                <Card.Body>
                    <Card.Title>
                        {props.itemName}
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACaElEQVRoge2Zy2sTURTGv5NJtAl5YFeiwW2LbsRHy2hEo1jc2KT/iUjxsVeULiy4c+ef0HRVFE2lJoGg6MruNXZZU9M2j2bmuEhpUfPqNyEPmB/M6s53zvnm3nPnBbi4uLgMEmk1kJ4Kaj8L6UQ8v920Vk+/C+k13k4ntHLeLzqthJGfAdfAoBl5Ax2b+CismOHxY7YmRXUWwCSg0caIFACsi8iy4fMsXfu49atXOXtiIGvCX7WC98WyHygQPhw52MAmAEyoarJesxbfT4UWxozS4pUcyk5zO15Cb64GTlWt0AcAT/4uviURgT6tWsHs24v+M07zOzKQnvZHfXuePKCXCfl5r2Fk3pn+005qoA1kTfjFNlIAnBQQ9VjepfQNjLEBaAO1enBeBRdY/SF6CTuhe6yaMrBihschmGeT/ofoo7VY5AQjpQwct3Suy4btlki9aicYIbmE9C6na4PoLCNje+AcqWvHWUbEGjhJ6tpB7WZD8ywkgM3oKAMCbDC6dqhwMSkDCnxjdO0QMiY3AyLLjK4dtmqK0VEGKh5JAdhitC0oSs1HXRTKwJ3c702FLDDaZijkWfxrscho6V1IAqUXgHxi9QdxRPMSKL1k9bSB+CoqtlFPAiiwMQD8qHl1Lr6KChvA0X3gVq78c89nT4tonpB/qVtWbCaz62hLdnwjm8nsbqh/5zpUHqO7xi4q5GF5c9u8/bn83Wn+nrwTN5ZA6flaLPKqXrUTEE1AMAlF46VeUIBiHdAUar7UTbJhm9HTrxL7Xxte7x99YWiehVhcA4Nm5A10bOJh+1PzLyM/Ay4uLi6D5Q8FuLRpD+X2VAAAAABJRU5ErkJggg=="/>
                    </Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Card.Text>
                        Rs. {props.price}
                    </Card.Text>
                    <Button variant="secondary" className="button-for-changing-quantity">-</Button>
                    <input type="number" placeholder="0" min="0" className="quantity-input"/>
                    <Button variant="secondary" className="button-for-changing-quantity">+</Button>
                </Card.Body>
            </Card>
        );
}

export default ItemCard;
