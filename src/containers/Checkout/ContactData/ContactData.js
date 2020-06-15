import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return(
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name" className={styles.Input} />
                    <input type="text" name="email" placeholder="Your email" className={styles.Input} />
                    <input type="text" name="street" placeholder="Your address" className={styles.Input} />
                    <input type="text" name="postal" placeholder="Your post code" className={styles.Input} />
                    <Button buttonType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;