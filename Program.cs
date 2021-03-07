using System;
using System.IO;

namespace KaraokeTrimmer
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            var path = args[0];
            var originalFile = args[1];
            var destinationFile = args[2];
            var fileText = File.ReadAllLines(path + originalFile);

            for (var i = 0; i < fileText.Length; i++)
            {
                if (!fileText[i].StartsWith("Dialogue")) continue;
                fileText[i] = fileText[i].Replace("{\\k90} {", "{");
                var start = fileText[i].Split(',')[1];
                var timeSpan = TimeSpan.Parse(start);
                var timeAdd = timeSpan.Add(new TimeSpan(0, 0, 0, 0, 905));
                var timeAdded = timeAdd.ToString("g");
                fileText[i] = fileText[i].Replace(start, timeAdded);
            }

            File.WriteAllLines(path + destinationFile, fileText);
        }
    }
}
