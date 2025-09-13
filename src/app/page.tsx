'use client'

import { useEffect, useState } from "react";

export default function Home() {
  type Task = {
    id: number;
    title: string;
    completed: boolean;
  };

  type FinishedTask = {
    id: number;
    title: string;
  }

  const [task, setTask] = useState<Task[]>([]);
  const [finishedTask, setFinishedTask] = useState<FinishedTask[]>([]);
  const [newTask, setNewTask] = useState<string>("");


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedFinishedTasks = localStorage.getItem("finishedTasks");

    if (storedTasks) setTask(JSON.parse(storedTasks));
    if (storedFinishedTasks) setFinishedTask(JSON.parse(storedFinishedTasks));
  }, []);

  // Sauvegarder automatiquement quand les tâches changent
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTask));
  }, [finishedTask]);


  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskItem: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTask([...task, newTaskItem]);
    setNewTask("");
  }

  const handleDeleteTask = (id: number) => {
    setTask(task.filter((t) => t.id !== id));
  }

  const handleCompletedTask = (id: number) => {
    setTask(
      task.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
   );
    setFinishedTask([...finishedTask, {id: id, title: task.find(t => t.id === id)?.title || ""}]);
    handleDeleteTask(id);
  }

  const handleDeleteFinishedTask = (id: number) => {
    setFinishedTask(finishedTask.filter((ft) => ft.id !== id));
  };

  
  return (
    <div className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 min-h-screen flex items-center justify-center font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto py-8 px-2 md:px-8 gap-8">
        {/* Carte Entrée & Liste des Tâches (Gauche) */}
        <div className="bg-white/80 shadow-2xl rounded-3xl p-6 md:p-8 w-full md:w-1/2 flex flex-col items-center max-h-[90vh] backdrop-blur-md border border-white/40">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-lg">Liste de tâches</h1>
          <div className="flex mb-4 w-full">
            <input
              type="text"
              className="border border-gray-300 rounded-l-lg px-4 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Ajouter une nouvelle tâche"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyUp={e => { if (e.key === "Enter") handleAddTask(); }}
            />
            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-r-lg text-sm sm:text-base font-semibold shadow-md hover:scale-105 transition"
              onClick={handleAddTask}
            >
              Ajouter
            </button>
          </div>
          <ul className="w-full flex-1 overflow-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
              style={{ maxHeight: "calc(80vh - 180px)" }}>
            {task.length === 0 && (
              <li className="text-center text-gray-400 py-8">Aucune tâche pour l&apos;instant. Ajoutez-en une !</li>
            )}
            {task.map((t) => (
              <li key={t.id} className="flex justify-between items-center mb-2 bg-white/70 rounded-lg px-3 py-2 shadow hover:shadow-lg transition">
                <span className={`truncate ${t.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{t.title}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-2 py-1 rounded shadow flex items-center justify-center transition"
                    title={t.completed ? "Annuler" : "Terminer"}
                    onClick={() => handleCompletedTask(t.id)}
                  >
                    {/* Icône coche */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    className="bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white px-2 py-1 rounded shadow flex items-center justify-center transition"
                    title="Supprimer"
                    onClick={() => handleDeleteTask(t.id)}
                  >
                    {/* Icône poubelle */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m4 0H5m2 0v14a2 2 0 002 2h6a2 2 0 002-2V6" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Carte Tâches Terminées (Droite) */}
        <div className="bg-white/80 max-h-[90vh] shadow-2xl rounded-3xl p-6 md:p-8 w-full md:w-1/2 flex flex-col items-center backdrop-blur-md border border-white/40">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 drop-shadow-lg">Tâches terminées</h2>
          <ul className="w-full flex-1 overflow-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
              style={{ maxHeight: "calc(80vh - 140px)" }}>
            {finishedTask.length === 0 && (
              <li className="text-center text-gray-300 py-8">Aucune tâche terminée pour l&apos;instant.</li>
            )}
            {finishedTask.map((ft) => (
              <li key={ft.id} className="flex justify-between items-center mb-2 bg-white/70 rounded-lg px-3 py-2 shadow hover:shadow-lg transition text-gray-500">
                {/* Icône cercle coché */}
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" />
                  </svg>
                  <span className="truncate">{ft.title}</span>
                </div>
                <button
                  className="bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white px-2 py-1 rounded shadow flex items-center justify-center transition"
                  title="Supprimer"
                  onClick={() => handleDeleteFinishedTask(ft.id)}
                >
                  {/* Icône poubelle */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m4 0H5m2 0v14a2 2 0 002 2h6a2 2 0 002-2V6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
