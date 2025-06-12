import { useState } from 'react';
import logo from "../../assets/images/recipelogo.avif";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./AddRecipe.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add_recipe, all_recipe } from '../../Services/Actions/Actionrecipe';

const AddRecipe = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        image: '',
        description: '',
        ingredients: '',
        category: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required.";
        if (!form.description.trim()) newErrors.description = "Description is required.";
        if (!form.ingredients.trim()) newErrors.ingredients = "Ingredients are required.";
        if (!form.category.trim()) newErrors.category = "Please select a category.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const id = Math.floor(Math.random() * 10000);
        const recipeWithId = { ...form, id };

        dispatch(add_recipe(recipeWithId));
        dispatch(all_recipe());

        alert("Recipe added successfully!");

        setForm({
            title: '',
            image: '',
            description: '',
            ingredients: '',
            category: '',
        });

        navigate("/");
    };

    return (
        <div className="container mt-4">
            <div className="Recipe d-flex justify-content-center align-items-center gap-4 mb-4">
                <Link to={"/"}><img src={logo} alt="logo" width="60" /></Link>
                <h2>Add New Recipe</h2>
            </div>

            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label>Recipe Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter Title..." value={form.title} onChange={handleChange} isInvalid={!!errors.title} />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Recipe Image URL</Form.Label>
                    <Form.Control type="text" name="image" placeholder="Recipe Image URL..." value={form.image} onChange={handleChange} isInvalid={!!errors.image} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={3} value={form.description} onChange={handleChange} isInvalid={!!errors.description} />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control type="text" name="ingredients" value={form.ingredients} onChange={handleChange} isInvalid={!!errors.ingredients} />
                    <Form.Control.Feedback type="invalid">{errors.ingredients}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={form.category} onChange={handleChange} isInvalid={!!errors.category} >
                        <option value="">Select Category</option>
                        <option>Indian</option>
                        <option>Italian</option>
                        <option>Mexican</option>
                        <option>Chinese</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                    <Button type="submit" className="custom-submit-btn">Add Recipe</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddRecipe;