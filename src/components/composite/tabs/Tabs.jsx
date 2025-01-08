import React from 'react';
import { useSwipeable } from 'react-swipeable';

const Tabs = ({tabsData}) => {
    const [activeTab, setActiveTab] = React.useState(1);
    const tabContext = tabsData?.filter((item) => (item.id === activeTab))[0].context

    const onSwipeLeftHandler = () => {
        let _activeTab = activeTab < tabsData?.length ? activeTab + 1 : activeTab;
        setActiveTab(_activeTab);
    };

    const onSwipeRightHandler = () => {
        let _activeTab = activeTab > 1 ? activeTab - 1 : activeTab;
        setActiveTab(_activeTab);
    };

    const handlers = useSwipeable({
        onSwipedLeft: onSwipeLeftHandler,
        onSwipedRight: onSwipeRightHandler,
    });

    return (
        <div {...handlers} className="rounded-lg border border-gray-900 dark:border-gray-500">
            <div className="flex items-center justify-start border-b border-gray-900 dark:border-gray-500 gap-4 p-2">
                {tabsData?.map((item, index) => (
                    <button
                        key={index}
                        onClick={
                            () => setActiveTab(item?.id)
                        }
                        className={`focus:outline-none ${activeTab === item.id ? 'text-black bg-gray-200 dark:text-white dark:bg-gray-700' : 'text-black bg-gray-50 dark:text-gray-500 dark:bg-transparent'}`}
                    >
                        {item?.title}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-start gap-4 p-2">
                {tabContext ?? <p>اطلاعاتی یافت نشد</p>}
            </div>
        </div>
    )
}

export default Tabs;
