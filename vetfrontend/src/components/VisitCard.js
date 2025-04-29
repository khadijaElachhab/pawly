function VisitCard({ visit }) {
  console.log("Visite reçue:", visit); // pour déboguer
  
  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-header bg-warning text-dark">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            {visit && visit.date 
              ? (typeof visit.date === 'string' ? visit.date : "Format de date non géré") 
              : "Date non disponible"}
          </h5>
        </div>
      </div>
      <div className="card-body">
        <p>Description: {visit?.description || "Non disponible"}</p>
      </div>
    </div>
  );
}