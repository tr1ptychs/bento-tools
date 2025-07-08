type TodoItemProps = {
  todo: string;
  checked: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

function TodoItem({ todo, checked, onToggle, onDelete }: TodoItemProps) {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <input
            type="checkbox"
            className="size-4 mr-2"
            checked={checked}
            onChange={onToggle}
          />
          <div className="inline">{todo}</div>
        </div>
        <button
          className="inline text-xl ml-2 p-1 border-2 border-sky-200"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
}
export default TodoItem;
