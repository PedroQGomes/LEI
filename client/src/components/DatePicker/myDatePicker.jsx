import React,{useState} from 'react'
import DatePicker,{registerLocale,setDefaultLocale,forwardRef} from "react-datepicker";
import { Button} from "@chakra-ui/react"
import {FaCalendarAlt}  from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import moment from 'moment';

registerLocale('pt', pt);
setDefaultLocale('pt');


const MyDatePicker = (props) => {
    
    const [startDate, setStartDate] = useState(()=> {
        var dateMomentObject = moment(props.startDate, "DD/MM/YYYY");
        return dateMomentObject.toDate();
    });

    const handleChange = (date) => {
        setStartDate(date)
    }

    return (
        <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={handleChange}
        
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
