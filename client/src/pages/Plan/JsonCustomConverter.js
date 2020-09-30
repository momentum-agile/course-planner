import json2md from "json2md";

json2md.converters.name = (input, json2md) => {
    return `# ${input}`;
};

json2md.converters.courseAllocations = (input, json2md) => {
    return json2md(input);
};

json2md.converters.student = (input, json2md) => {
    return `## Student Name: ${input}`;
};

json2md.converters.programmeDegree = (input, json2md) => {
    return `## Degree: ${input}`;
};

json2md.converters.notes = (input, json2md) => {
    return `## Notes: ${input}`;
};

json2md.converters.completed = (input, json2md) => {
    return `## Completed: ${input}`;
};

json2md.converters.year = (input, json2md) => {
    return `## Completed: ${input}`;
};

export const parsePlanWithStudent = (plan, student, programmeDegree, startYear) => {
    const parsedObjectArray = [
        { name: plan.name },
        { student: student.name },
        { programmeDegree: programmeDegree.name },
        { courseAllocations: parseCourseAllocations(plan.courseAllocations, startYear) },
        { notes: plan.notes },
        { completed: plan.completed },
    ];
    return parsedObjectArray;
};

const parseCourseAllocations = (courseAllocations, startYear) => {
    const preliminary = courseAllocations.reduce((acc, curr) => {
        if (!curr.course) return acc;
        const { year, semester, course } = curr;
        if (!acc[year]) {
            acc[year] = [];
        }

        acc[year] = [...acc[year], { course, semester }];

        return acc;
    }, {});

    const final = Object.keys(preliminary).reduce((acc, curr) => {
        const currYear = parseInt(curr) + parseInt(startYear);
        acc.push({ h1: `Year: ${String(currYear)}` });
        const courses = preliminary[curr];
        const mappedCourses = courses
            .map(({ course, semester }) => ({
                Course: course,
                Semester: semester,
            }))
            .sort((a, b) => {
                if (a.Semester === b.Semester) {
                    return 0;
                } else if (a.Semester === "S1") return -1;
                else return 1;
            });

        const table = {
            table: {
                headers: ["Course", "Semester"],
                rows: mappedCourses,
            },
        };

        acc.push(table);

        return acc;
    }, []);
    return final;
};
