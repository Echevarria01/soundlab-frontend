export default function ProductCard({ title, description, image }) {
  return (
    <div className="card h-100">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary mt-auto">Ver más</a>
      </div>
    </div>
  );
}
