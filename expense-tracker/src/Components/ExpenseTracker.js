import { useState } from "react";
import { pushDataToServer } from "../services/menu";


function ExpenseTracker(props) {
    const [payeeName, setPayeeName] = useState("")
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState(0)
    const [setDate, setBillDate] = useState("11-08-2024")
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handlePayeeNameChange = (event) => {
        setPayeeName(event.target.value);
    }
    const handleProductChange = (event) => {
        setProduct(event.target.value);
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    const handleBillDateChange = (event) => {
        setBillDate(event.target.value);
    }

    let submitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        const newExpense = {
            payeeName,
            product,
            price,
            setDate
        }
        const data = await pushDataToServer(newExpense);
        console.log(data)
        setTimeout(() => {
            props.onClose();
        }, 2000);
    }


    return (
        <section>
            <header>
                <h1>Add New Item</h1>
                <p>Read the belwo instructions before proceeding:
                    <br></br> Make sure you fill all the fields where * is provided
                </p>
            </header>
            <form onSubmit={submitHandler}>
                {isSubmitted && (
                    <h3 style={{
                        color: "green",
                        backgroundColor: "lightgrey",
                        padding: "10px",
                        borderadius: "5px",
                    }}>
                        Information Added Successfully!
                    </h3>
                )}
                <article>
                    <p>Name</p>
                    <select required value={payeeName} onChange={handlePayeeNameChange}>
                        <option value="">Choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>

                <article>
                    <p>Product Purchased</p>
                    <input type="text" required value={product} onChange={handleProductChange}></input>
                </article>

                <article>
                    <p>Price</p>
                    <input type="number" required value={price} onChange={handlePriceChange}></input>
                </article>

                <article>
                    <p>Date</p>
                    <input type="date" required value={setDate} onChange={handleBillDateChange}></input>
                </article>

                <button className="form-button" type="button" onClick={props.onClose}>Close</button>

                <button className="form-button" type="submit" >Submit</button>
            </form>
        </section>
    )
}

export default ExpenseTracker;