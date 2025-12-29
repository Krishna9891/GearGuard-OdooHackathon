import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import api from '../services/api';
import Navbar from '../components/Navbar';
import KanbanColumn from '../components/KanbanColumn';
import RequestCard from '../components/RequestCard';
import RequestForm from '../components/requests/RequestForm';
import Button from '../components/ui/Button';
import { FaPlus, FaColumns } from 'react-icons/fa';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get('/requests');
            setRequests(response.data.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeRequest = requests.find(r => r.id == activeId); // Loose equality for safety

        if (!activeRequest) return;

        // Determine destination stage
        let newStage = overId;
        const overRequest = requests.find(r => r.id == overId);

        if (overRequest) {
            // Dropped onto another card, so take that card's stage
            newStage = overRequest.stage;
        }
        // Else: Dropped onto the column directly (overId is 'new', 'in_progress' etc)

        // Only update if stage changed
        if (activeRequest.stage !== newStage) {
            // Optimistic Update
            const oldStage = activeRequest.stage;
            setRequests((items) => {
                return items.map(item => {
                    if (item.id == activeId) {
                        return { ...item, stage: newStage };
                    }
                    return item;
                });
            });

            try {
                await api.patch(`/requests/${activeId}/stage`, { stage: newStage });

                if (newStage === 'scrap') {
                    // Potential equipment effect
                }
            } catch (error) {
                console.error('Update failed:', error);
                // Revert
                setRequests((items) => {
                    return items.map(item => {
                        if (item.id == activeId) {
                            return { ...item, stage: oldStage };
                        }
                        return item;
                    });
                });
            }
        }

        setActiveId(null);
    };

    const stages = ['new', 'in_progress', 'repaired', 'scrap'];

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-12 overflow-x-hidden transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 h-[calc(100vh-100px)] flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 animate-slide-up">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
                        <p className="text-gray-500 mt-1">Drag and drop cards to update status.</p>
                    </div>
                    <Button variant="primary" icon={FaPlus} onClick={() => setIsFormOpen(true)}>
                        New Request
                    </Button>
                </div>

                {/* Kanban Board */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-6 overflow-x-auto pb-4 h-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {stages.map((stage) => (
                            <div key={stage} className="flex-1 min-w-[300px] h-full flex flex-col">
                                <KanbanColumn
                                    id={stage}
                                    title={stage.replace('_', ' ')}
                                    requests={requests.filter(r => r.stage === stage)}
                                />
                            </div>
                        ))}
                    </div>

                    <DragOverlay>
                        {activeId ? (
                            <div className="transform rotate-2 scale-105 opacity-90">
                                <RequestCard request={requests.find(r => r.id === activeId)} isOverlay />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                <RequestForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onEventSaved={fetchRequests}
                />
            </div>
        </div>
    );
};

export default Requests;
