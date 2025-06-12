import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { update_recipe, get_recipe } from '../../Services/Actions/Actionrecipe';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { recipe } = useSelector((state) => state.recipeReducer);

    const intialState = {
        id: "",
        title: "",
        description: "",
        ingredients: "",
        category: "",
        image: ""
    };

    const [form, setForm] = useState(intialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(update_recipe(form));
        setForm(intialState);
        navigate("/");
    };

    useEffect(() => {
        if (id) {
            dispatch(get_recipe(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (recipe) {
            setForm(recipe);
        }
    }, [recipe]);

    return (
        <Container className="mt-4">
            <h2>Edit Recipe</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={form.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" value={form.image} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={3} value={form.description} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control name="ingredients" value={form.ingredients} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={form.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option>Indian</option>
                        <option>Italian</option>
                        <option>Mexican</option>
                        <option>Chinese</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" variant="success">Update</Button>
            </Form>
        </Container>
    );
};

export default EditRecipe;