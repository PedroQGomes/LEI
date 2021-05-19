import React,{useState} from 'react'
import DatePicker,{registerLocale,setDefaultLocale,forwardRef} from "react-datepicker";
import { Button} from "@chakra-ui/react"
import {FaCalendarAlt}  from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';

registerLocale('pt', pt);
setDefaultLocale('pt');


const MyDatePicker = () => {
    
    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={date => setStartDate(date)}
        customInput={<CustomInput />}
        />
    );
   
}



const CustomInput = React.forwardRef((props, ref) => {
    return (
        <Button rightIcon={<FaCalendarAlt />} colorScheme="teal" variant="outline" onClick={props.onClick} ref={ref}>
            {props.value || props.placeholder}
        </Button>
    );
});

//GiSewingString
export default MyDatePicker
