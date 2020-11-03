import React, { Component } from 'react';
import './SideBar.css';
import { RangeSlider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { BsArrowUpDown } from 'react-icons/bs';

class SideBar extends Component {

    state = {
        inputs: [
            {
                id: 1,
                min: 30,
                max: 50
            },
            {
                id: 2,
                min: 10,
                max: 100
            }
        ],
        sliders: [
            {
                id: 1,
                min: 30,
                max: 50,
                limit: [30, 50]
            },
            {
                id: 2,
                min: 10,
                max: 100,
                limit: [10, 100]
            }
        ],
    }

    sliderOnChangeHandler = (value, sliderId) => {
        let updateInput = this.state.inputs.find(slider => slider.id === sliderId);
        const indexInput = this.state.inputs.indexOf(updateInput);
        updateInput = {...this.state.inputs.find(slider => slider.id === sliderId)};
        updateInput.min = value[0];
        updateInput.max = value[1];
        let updateInputs = [...this.state.inputs];
        updateInputs[indexInput] = updateInput;
        
        let updateSlider = this.state.sliders.find(slider => slider.id === sliderId);
        const index = this.state.sliders.indexOf(updateSlider);
        updateSlider = {...this.state.sliders.find(slider => slider.id === sliderId)};
        updateSlider.min = value[0];
        updateSlider.max = value[1];
        let updateSliders = [...this.state.sliders];
        updateSliders[index] = updateSlider;
        this.setState({
            sliders: updateSliders,
            inputs: updateInputs
        });
    }

    inputOnChangeHandler = (event, inputId, min) => {
        let updateInput = this.state.inputs.find(input => input.id === inputId);
        const index = this.state.inputs.indexOf(updateInput);
        updateInput = {...this.state.inputs.find(input => input.id === inputId)};
        
        if(min) {
            updateInput.min = event.target.value;
        } else {
            updateInput.max = event.target.value;
        }
        let updateInputs = [...this.state.inputs];
        updateInputs[index] = updateInput;
        this.setState({
            inputs: updateInputs
        });
    }

    inputPressEnterHandler = (event, id, min) => {
        if(event.key === 'Enter') {
            let updateSlider = this.state.sliders.find(slider => slider.id === id);
            const indexS = this.state.sliders.indexOf(updateSlider);
            updateSlider = {...updateSlider};
    
            let updateInput = this.state.inputs.find(input => input.id === id);
            const indexI = this.state.inputs.indexOf(updateInput);
            updateInput = {...updateInput};

            if(min) {
                if(updateInput.min < updateSlider.limit[0]) {
                    updateInput.min = updateSlider.limit[0];
                }
                if(updateInput.min > updateSlider.max) {
                    updateInput.min = updateSlider.max;
                }
                updateSlider.min = updateInput.min;
            } else {
                if(updateInput.max > updateSlider.limit[1]) {
                    updateInput.max = updateSlider.limit[1];
                }
                if(updateInput.max < updateSlider.min) {
                    updateInput.max = updateSlider.min;
                }
                updateSlider.max = updateInput.max;
            }

            let updateInputs = [...this.state.inputs];
            updateInputs[indexI] = updateInput;
            let updateSliders = [...this.state.sliders];
            updateSliders[indexS] = updateSlider;
            this.setState({
                sliders: updateSliders,
                inputs: updateInputs
            }); 
        }
    }

    render() {
        return (
            <div className='side-bar-list-container'>
                <div className='side-bar-lable-container'>
                    <BsArrowUpDown className='side-bar-lable-icon'/>
                    <p>Firm</p>
                </div>
                <div className='two-range-slider-container'>
                    <input 
                        className='two-range-slider-input'
                        type='number' 
                        value={this.state.inputs[0].min} 
                        onChange={event => this.inputOnChangeHandler(event, 1, true)}
                        onKeyDown={event => this.inputPressEnterHandler(event, 1, true)}
                    />
                    <div className='two-range-slider'>
                        <RangeSlider 
                            onChange={value => this.sliderOnChangeHandler(value, 1)}
                            value={[this.state.sliders[0].min, this.state.sliders[0].max]}
                            min={this.state.sliders[0].limit[0]}
                            max={this.state.sliders[0].limit[1]}
                        />
                    </div>
                    
                    <input 
                    className='two-range-slider-input'
                        type='number' 
                        value={this.state.inputs[0].max} 
                        onChange={event => this.inputOnChangeHandler(event, 1, false)}
                        onKeyDown={event => this.inputPressEnterHandler(event, 1, false)}
                    />
                </div>
                <div className='side-bar-lable-container'>
                    <BsArrowUpDown className='side-bar-lable-icon'/>
                    <p>Globle</p>
                </div>
                <div className='two-range-slider-container'>
                    <input 
                        className='two-range-slider-input'
                        type='number' 
                        value={this.state.inputs[1].min} 
                        onChange={event => this.inputOnChangeHandler(event, 2, true)}
                        onKeyDown={event => this.inputPressEnterHandler(event, 2, true)}
                    />
                    <div className='two-range-slider'>
                        <RangeSlider 
                            onChange={value => this.sliderOnChangeHandler(value, 2)}
                            value={[this.state.sliders[1].min, this.state.sliders[1].max]}
                            min={this.state.sliders[1].limit[0]}
                            max={this.state.sliders[1].limit[1]}
                        />
                    </div>
                    <input 
                        className='two-range-slider-input'
                        type='number' 
                        value={this.state.inputs[1].max} 
                        onChange={event => this.inputOnChangeHandler(event, 2, false)}
                        onKeyDown={event => this.inputPressEnterHandler(event, 2, false)}
                    />
                </div>
            </div>
        );
        
    }
    
}

export default SideBar