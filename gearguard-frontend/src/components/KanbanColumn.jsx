import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RequestCard from './RequestCard';

const KanbanColumn = ({ id, title, requests }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    const getStageColor = (stageId) => {
        switch (stageId) {
            case 'new': return 'bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800 text-info-700 dark:text-info-300';
            case 'in_progress': return 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-700 dark:text-warning-300';
            case 'repaired': return 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-700 dark:text-success-300';
            case 'scrap': return 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-300';
            default: return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div ref={setNodeRef} className="flex-1 flex flex-col h-full bg-gray-100 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            {/* Column Header */}
            <div className={`p-3 rounded-lg mb-4 border flex justify-between items-center transition-colors duration-200 ${getStageColor(id)}`}>
                <h3 className="font-bold uppercase text-xs tracking-wider">{title}</h3>
                <span className="bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                    {requests.length}
                </span>
            </div>

            {/* Droppable Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                <SortableContext
                    items={requests.map(r => r.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {requests.map((request) => (
                        <RequestCard key={request.id} request={request} />
                    ))}
                </SortableContext>

                {requests.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Drop here</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;
