import { Button, Card, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/recipelogo.avif';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { all_recipe, delete_recipe } from '../../Services/Actions/Actionrecipe';

function Header() {
    const recipe = useSelector(state => state.recipeReducer.recipes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        dispatch(all_recipe());
    }, [dispatch]);

    useEffect(() => {
        const filtered = recipe.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(filtered);
    }, [searchTerm, recipe]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(delete_recipe(id));
    };

    const handleView = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    return (
        <Container>
            <nav className="navbar navbar-expand-lg d-flex align-items-center justify-content-between flex-wrap">
                <Link className="navbar-logo" to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Form className="d-flex my-2" style={{ flex: 1, maxWidth: '400px' }}>
                    <Form.Control
                        type="search"
                        placeholder="Search by title or category"
                        className="me-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form>
                <Link className="nav-recipe text-decoration-none" to="/add">Add Recipe</Link>
            </nav>

            <Row>
                {filteredRecipes.length === 0 ? (
                    <h4 className="text-center w-100">No Recipes Found</h4>
                ) : (
                    filteredRecipes.map((recipe, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="card_data shadow-sm h-100">
                                <Card.Img
                                    variant="top"
                                    src={recipe.image}
                                    alt={recipe.title}
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-primary mb-2">{recipe.title}</Card.Title>
                                    <Card.Text className="mb-1"><strong>Ingredients:</strong> {recipe.ingredients}</Card.Text>
                                    <Card.Text className="mb-2"><strong>Category:</strong> {recipe.category}</Card.Text>
                                    <div className="mt-auto d-flex justify-content-center gap-3 pt-3">
                                        <Button variant="info" size="sm" onClick={() => handleView(recipe)}>View</Button>
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(recipe.id)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(recipe.id)}>Delete</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRecipe?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedRecipe?.image} alt={selectedRecipe?.title} className="img-fluid mb-3" style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }} />
                    <p><strong>Description:</strong> {selectedRecipe?.description}</p>
                    <p><strong>Category:</strong> {selectedRecipe?.category}</p>
                    <p><strong>Ingredients:</strong> {selectedRecipe?.ingredients}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Header;