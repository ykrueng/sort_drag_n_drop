import React from "react";

const List = ({ items, ...props }) => {
  var dragging = null;
  return (
    <div
      onDragOver={event => {
        event.preventDefault();
        var bounding = event.target.getBoundingClientRect();
        var offset = bounding.y + bounding.height / 2;
        if (event.clientY - offset > 0) {
          event.target.style["border-bottom"] = "solid 4px red";
          event.target.style["border-top"] = "";
        } else {
          event.target.style["border-top"] = "solid 4px red";
          event.target.style["border-bottom"] = "";
        }
      }}
      onDragLeave={event => {
        event.target.style["border-bottom"] = "";
        event.target.style["border-top"] = "";
      }}
      onDragStart={event => {
        dragging = event.target;
        event.dataTransfer.setData("text/html", dragging);
      }}
      onDrop={event => {
        event.preventDefault();

        if (event.target.style["border-bottom"] !== "") {
          event.target.style["border-bottom"] = "";
          props.insertItem(event.target.id, dragging.id, true);
        } else {
          event.target.style["border-top"] = "";
          props.insertItem(event.target.id, dragging.id, false);
        }
      }}
      className="list"
    >
      {items.map(item => (
        <div draggable id={item.id} key={item.id} className="item">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default List;
