import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Chúc mừng bạn đã hoàn thành {completedTasksCount} công việc
                {activeTasksCount > 0 &&
                  ` và còn ${activeTasksCount} công việc nữa thôi`}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Bạn còn {activeTasksCount} công việc đang thực hiện, cố gắng lên!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
