import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Switch extends Component {

    static defaultProps = {
        values: ['on', 'off'],
        onChange: () => {}
    };

    static propTypes = {
        values: PropTypes.array.isRequired,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {};
        this.state.value = !this.props.defaultValue ? this.props.values[0] : this.props.defaultValue;
    }

    componentDidUpdate(prevProps) {
        if (this.props.defaultValue !== prevProps.defaultValue)
        {
            this.setState({
                value: this.props.defaultValue ? this.props.defaultValue : this.props.values[0]
            });
        }
    }

    render() {
        let posX = this.props.values.indexOf(this.state.value) * 100 / this.props.values.length;

        return (
            <View style={{...styles.switchButton, ...this.props.styles}}>
                <View style={{...styles.switchButtonContainer}}>

                    <View style={{
                        ...styles.switchButtonToggle,
                        width: (100 / this.props.values.length) + '%',
                        left: posX + '%'
                    }}>
                        <TouchableOpacity onPress={this.onPress}>
                            <Text style={{...styles.switchButtonText}}>
                                {this.state.value}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.props.values.map((value, index) => {
                            return (
                                <TouchableOpacity key={'ph'+index} onPress={this.onPress.bind(this, value, index)}
                                                  style={{...styles.switchPlaceholder}}>
                                    <Text style={{...styles.switchPlaceholderText}}>
                                        {value}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        );
    }

    onPress = (value, index) => {

        // If the toggle button is pressed, find the next index and value
        if(index === undefined) {
            index = this.props.values.indexOf(this.state.value);
            index = (index + 1 >= this.props.values.length ? 0 : index + 1);
            value = this.props.values[index];
        }

        this.setState({ value });

        if(this.props.onChange && typeof this.props.onChange === 'function')
            this.props.onChange(value, index);
    };
}

const styles = {
    switchButton: {
        backgroundColor: '#9d9d9d',
        borderRadius: 40,
        alignSelf: 'center',
        alignItems: 'stretch',
        overflow: 'hidden',
    },
    switchButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        margin: 2
    },
    switchButtonToggle: {
        position: 'absolute',
        top: 0,
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#f7f7f7',
        overflow: 'hidden',
        zIndex: 999
    },
    switchButtonText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 16,
        color: '#444',
        padding: 10
    },
    switchPlaceholder: {
        flex: 1
    },
    switchPlaceholderText: {
        flex: 1,
        color: '#eee',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 18,
        padding: 8
    }
};


export default Switch