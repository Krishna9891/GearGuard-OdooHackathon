import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { FaWrench, FaTools, FaCalendarAlt } from 'react-icons/fa';

const RequestCard = ({ request, isOverlay }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: request.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    // Calculate if overdue (simplified frontend check)
    const isOverdue = request.scheduled_date && new Date(request.scheduled_date) < new Date() && request.stage !== 'repaired' && request.stage !== 'scrap';

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
            <Card
                variant="kanban"
                padding="sm"
                className={`
                    relative group transition-colors duration-200
                    ${isOverdue ? 'border-l-4 border-l-danger-500 bg-danger-50/30' : ''}
                    ${isOverlay ? 'shadow-2xl rotate-2 cursor-grabbing bg-white dark:bg-gray-700' : ''}
                `}
            >
                {/* Header: ID & Priority */}
                <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        {request.request_number}
                    </span>
                    <Badge variant="priority" type={request.priority} />
                </div>

                {/* Body: Subject */}
                <h4 className="text-gray-900 dark:text-white font-bold text-[15px] leading-tight mb-2 line-clamp-2">
                    {request.subject}
                </h4>

                {/* Meta: Equipment */}
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-3">
                    <FaWrench className="mr-1.5 text-gray-400 dark:text-gray-500" />
                    <span className="truncate max-w-[180px]">
                        {request.equipment?.name || request.work_center?.name || 'Unknown Asset'}
                    </span>
                </div>

                {/* Footer: User & Date */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-600">
                    <div className="flex items-center" title={request.assignedTo?.full_name}>
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 text-xs font-bold ring-2 ring-white dark:ring-gray-600">
                            {request.assignedTo?.full_name?.charAt(0) || '?'}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 truncate max-w-[80px]">
                            {request.assignedTo?.full_name?.split(' ')[0] || 'Unassigned'}
                        </span>
                    </div>

                    {request.scheduled_date && (
                        <div className={`flex items-center text-xs ${isOverdue ? 'text-danger-600 dark:text-danger-400 font-bold' : 'text-gray-400 dark:text-gray-500'}`}>
                            <FaCalendarAlt className="mr-1" />
                            {new Date(request.scheduled_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default RequestCard;
