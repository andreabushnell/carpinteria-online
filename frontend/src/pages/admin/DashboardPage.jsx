import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const domains = [
    {
      title: "Categorías",
      description: "Gestión de categorías",
      path: "/admin/categories",
      countKey: "categoriesCount",
      color: "blue-panel",
    },
    {
      title: "Productos",
      description: "Gestión de inventario",
      path: "/admin/products/list",
      countKey: "productsCount",
      color: "green-panel",
    },
    {
      title: "Pedidos",
      description: "Gestión de pedidos",
      path: "/admin/orders",
      countKey: "ordersCount",
      color: "orange-panel",
    },
    {
      title: "Usuarios",
      description: "Gestión de usuarios",
      path: "/admin/users/list",
      countKey: "usersCount",
      color: "purple-panel",
    },
  ]

  const styles = {
    container: "",
    sidebar: "",
    panel: ""
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <nav>
          <button className="active">Inicio</button>
          <button onClick={() => navigate("/admin/categories")}>Categorías</button>
          <button onClick={() => navigate("/admin/products/list")}>Productos</button>
          <button onClick={() => navigate("/admin/orders")}>Pedidos</button>
          <button onClick={() => navigate("/admin/users/list")}>Usuarios</button>
        </nav>
      </div>
      <div className={styles.panel}>
        <section>
          {domains.map((domain) => (
            <div
              key={domain.title}
              className={`domain-card ${domain.color}`}
              onClick={() => navigate(domain.path)}>
                <div>
                  <h3>{domain.title}</h3>
                  <p>{domain.description}</p>
                </div>
                <div>{"->"}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
