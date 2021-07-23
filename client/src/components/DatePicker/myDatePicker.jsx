import React,{useState} from 'react'
import DatePicker,{registerLocale,setDefaultLocale,forwardRef} from "react-datepicker";
import { Button} from "@chakra-ui/react"
import {FaCalendarAlt}  from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';


registerLocale('pt', pt);
setDefaultLocale('pt');


const MyDatePicker = (props) => {
    

    return (
        <DatePicker
        selected={props.data}
        onChange={props.onChange}
        maxDate={new Date()}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={9}
        
            
        customInput={<CustomInput valid={props.valid}/>}
        />
    );
   
}



const CustomInput = React.forwardRef((props, ref) => {
    
    return (
        <Button disabled={!props.valid} rightIcon={<FaCalendarAlt />} colorScheme="teal" variant="outline" onClick={props.onClick} ref={ref}>
            {props.value || props.placeholder}
        </Button>
    );
});

//GiSewingString
export default MyDatePicker
