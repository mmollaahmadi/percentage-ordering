import React from 'react';

const Tabs = ({tabsData}) => {
    const [activeTab, setActiveTab] = React.useState(1);
    const tabContext = tabsData?.filter((item) => (item.id === activeTab))[0].context

    return (
        <div className="rounded-lg border border-gray-500">
            <div className="flex items-center justify-start border-b gap-4 p-2">
                {tabsData?.map((item, index) => (
                    <button
                        key={index}
                        onClick={
                            () => setActiveTab(item?.id)
                        }
                        className={` ${activeTab === item.id ? 'text-white bg-gray-150' : 'text-gray-500 bg-transparent'}`}
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
