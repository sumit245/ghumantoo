import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../actions/userActions';

export const useEditProfile = () => {
    const dispatch = useDispatch();

    // Get current user data from Redux store
    const { email_id, mobile_number, name } = useSelector((state) => state.user);

    // Local state
    const [editable, setEditable] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(mobile_number || '');
    const [uname, setUname] = useState(name || '');
    const [email, setEmail] = useState(email_id || '');
    const [gender, setGender] = useState('second'); // Default to female

    // Toggle edit mode
    const handleEnableEdit = useCallback(() => {
        setEditable(true);
    }, []);

    const handleCancelEdit = useCallback(() => {
        // Reset to original values
        setPhoneNumber(mobile_number || '');
        setUname(name || '');
        setEmail(email_id || '');
        setEditable(false);
    }, [mobile_number, name, email_id]);

    // Save profile changes
    const saveDetails = useCallback(() => {
        setEditable(false);
        dispatch(
            editProfile({
                mobile_number: phoneNumber,
                name: uname,
                email_id: email
            })
        );
    }, [dispatch, phoneNumber, uname, email]);

    // Input change handlers
    const handleNameChange = useCallback((value) => {
        setUname(value);
    }, []);

    const handleEmailChange = useCallback((value) => {
        setEmail(value);
    }, []);

    const handlePhoneChange = useCallback((value) => {
        setPhoneNumber(value);
    }, []);

    const handleGenderChange = useCallback((value) => {
        setGender(value);
    }, []);

    return {
        // User data from store
        currentName: name,
        currentEmail: email_id,
        currentMobile: mobile_number,

        // Edit state
        editable,

        // Form values
        phoneNumber,
        uname,
        email,
        gender,

        // Handlers
        handleEnableEdit,
        handleCancelEdit,
        saveDetails,
        handleNameChange,
        handleEmailChange,
        handlePhoneChange,
        handleGenderChange,
    };
};
