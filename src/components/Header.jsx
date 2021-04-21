import PropTypes from "prop-types";
import Button from "./Button";

const Header = (props) => {
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <Button
        color={props.showAdd ? "red" : "green"}
        text={props.showAdd ? "Close" : "Add"}
        onClick={props.onAdd}
      />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: "Task Tracker",
};
export default Header;
