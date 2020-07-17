import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addItem, deleteItem } from '../store/actions/itemActions';
import { Card, Button } from 'react-bootstrap';

import './itemCard.css';

class ItemCard extends Component{

    constructor(props) {
        super(props);

        this.showVegOrNonVegImage = this.showVegOrNonVegImage.bind(this);
        this.addItemFunction = this.addItemFunction.bind(this);
    }

    showVegOrNonVegImage (vegOrNonVeg) {
        if(vegOrNonVeg === "non-veg") {
            return (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACaElEQVRoge2Zy2sTURTGv5NJtAl5YFeiwW2LbsRHy2hEo1jc2KT/iUjxsVeULiy4c+ef0HRVFE2lJoGg6MruNXZZU9M2j2bmuEhpUfPqNyEPmB/M6s53zvnm3nPnBbi4uLgMEmk1kJ4Kaj8L6UQ8v920Vk+/C+k13k4ntHLeLzqthJGfAdfAoBl5Ax2b+CismOHxY7YmRXUWwCSg0caIFACsi8iy4fMsXfu49atXOXtiIGvCX7WC98WyHygQPhw52MAmAEyoarJesxbfT4UWxozS4pUcyk5zO15Cb64GTlWt0AcAT/4uviURgT6tWsHs24v+M07zOzKQnvZHfXuePKCXCfl5r2Fk3pn+005qoA1kTfjFNlIAnBQQ9VjepfQNjLEBaAO1enBeBRdY/SF6CTuhe6yaMrBihschmGeT/ofoo7VY5AQjpQwct3Suy4btlki9aicYIbmE9C6na4PoLCNje+AcqWvHWUbEGjhJ6tpB7WZD8ywkgM3oKAMCbDC6dqhwMSkDCnxjdO0QMiY3AyLLjK4dtmqK0VEGKh5JAdhitC0oSs1HXRTKwJ3c702FLDDaZijkWfxrscho6V1IAqUXgHxi9QdxRPMSKL1k9bSB+CoqtlFPAiiwMQD8qHl1Lr6KChvA0X3gVq78c89nT4tonpB/qVtWbCaz62hLdnwjm8nsbqh/5zpUHqO7xi4q5GF5c9u8/bn83Wn+nrwTN5ZA6flaLPKqXrUTEE1AMAlF46VeUIBiHdAUar7UTbJhm9HTrxL7Xxte7x99YWiehVhcA4Nm5A10bOJh+1PzLyM/Ay4uLi6D5Q8FuLRpD+X2VAAAAABJRU5ErkJggg==" alt="non-veg"/>
            )
        } else {
            return(
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACU0lEQVRoge2ZzW5SYRCGn+FACxuadmWUuG2jG2M07UmPkRuw0CtRSSN214UG7eI0dufOSyi9AkxADDFxZ/dau1TaTTU9MC6KiTZQ6BzCT3KehBW8M/My33zf+YGIiIiIcSK9vljxPR1lIf34WKh2rTU26kKGTbzfD3o5HxX9VsLUdyAyMG6m3kDfIb4Kru8uIE4e1bU2siSQAVA4RDlA2E/8Zq+6Wf05rJxDMeD6bkrVKSg8Q0mD/HfACCwiLAL5YJadFf/BthDs1Av107C5Qy+h1der11Xj7xFeAOkBJHOgL9s4H7w33s2w+UMZWN7NZloJaSB6/6pagTtBi5rruzfC1GA24PpuSoKgDIQpIAPOXnYrm7QGMBtoS2wDuGvV/0Xh3mk6eGLVmwy4vrsgKhvWpBcReO6VvHmL1tiB2DqDDeygzAUzkjNVYkz4yKjrjeiaRWYyoMRuW3SXx+SWRWfsgF6z6Xojxt1skq6F2haR1cCRUTf0mLYZUL5YdH0wxbR1QNg36S4LqZQtOpOBGK0ycGzRdkOhORuLm/4Uk4F6of4DZNui7YaIlCpPK02L1rwLJU8cX+CTVf8PjeSxs2sVmw1Utiq/oJUHDq0xgG/Oma6fx7IR6hyoF+rfnTNdBhpXV+vnuINXK9ZCbcmhD7JasXaUPIk/VNhkgMFWaCJSnI+n3erj6tew+YdyT9xZAq+8kvc2mJGcojkRlujc1HO+zA5AyylJlK0D242hPpXoPG141/mMhEm6FjIRGRg3U2+g7xBP2puai0x9ByIiIiLGyx9AgJ3oyiyc0wAAAABJRU5ErkJggg==" alt="veg"/>
            )
        }
    }
    
    addItemFunction() {
        this.props.addItem({
            itemName: this.props.itemName,
            itemPrice: this.props.price,
            itemQuanity: 1
        })
    }
    
    deleteItemFunction() {
        this.props.deleteItem(this.props.itemName);
    }

    render() {
        return (
            <Card style={{ width: '49%' }} className="card-for-item" bg="light">
                <Card.Body>
                    <Card.Title>
                        <div className="item-name">{this.props.itemName}</div>
                        <div className="vnv-id">{this.showVegOrNonVegImage(this.props.vegOrNonVeg)}</div>
                    </Card.Title>
                    <Card.Text className="item-description">
                        {this.props.description}
                    </Card.Text>
                    <Card.Text  className="item-price">
                        ₹ {this.props.price}
                    </Card.Text>
                    <Button onClick= {this.addItemFunction}>Add to Cart</Button>
                </Card.Body>
                <Card.Footer>
                  <i class="fas fa-minus fa-2x minus-div qty-div"  onClick={this.decreaseItemQuantity}></i>
                  <i class="fas fa-plus fa-2x plus-div qty-div" onClick={this.increaseItemQuantity}></i>
                </Card.Footer>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (itemObj) => { dispatch(addItem(itemObj)) },
        deleteItem: (itemName) => { dispatch(deleteItem(itemName)) }
    }
}

export default connect(null, mapDispatchToProps)(ItemCard);
